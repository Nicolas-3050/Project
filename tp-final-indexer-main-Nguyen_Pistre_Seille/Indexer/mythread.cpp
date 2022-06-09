#include "fsm.h"
#include "mythread.h"
#include <QDebug>
#include <QStringList>

//SFM
QStringList stringToList(QString line) {
    QStringList list;
    QRegExp     rx("\"([^\"]*)\"");
    int         pos = 0;
    while ((pos = rx.indexIn(line, pos)) != -1) {
        list << rx.cap(0);
        pos += rx.matchedLength();
    }
    for (auto l : qAsConst(list)) {
        QString ol = l;
        l.replace(" ", "<SPC>");
        line.replace(ol, l);
    }

    list.clear();
    QStringList tmp = line.split(' ');
    for (auto l : qAsConst(tmp)) {
        if (l.isEmpty())
            continue;

        list << l.replace("<SPC>", " ");
    }

    return list;
}


bool isCommand(QString const &str) {
    QStringList cmd = {"SEARCH", "STATUS", "INDEXER", "CLEAR", "GET", "ADD"};
    return cmd.contains(str);
}

bool isSearch(QString const &str) {
    return str == "SEARCH";
}

bool isStatus(QString const &str) {
    return str == "STATUS";
}

bool isIndexer(QString const &str) {
    return str == "INDEXER";
}

bool isClear(QString const &str) {
    return str == "CLEAR";
}

bool isGet(QString const &str) {
    return str == "GET";
}

bool isAdd(QString const &str) {
    return str == "ADD";
}

bool isFileNamePart(QString const &str) {
    return str != "" && !isCommand(str);
}

bool isSearchOption(QString const &str) {
    QStringList op2 = {"LAST_MODIFIED", "CREATED", "MAX_SIZE", "MIN_SIZE", "SIZE", "EXT", "TYPE"};
    return op2.contains(str);
}

bool isLastModified(QString const &str) {
    return str == "LAST_MODIFIED";
}

bool isCreated(QString const &str) {
    return str == "CREATED";
}

bool isMaxSize(QString const &str) {
    return str == "MAX_SIZE";
}

bool isMinSize(QString const &str) {
    return str == "MIN_SIZE";
}

bool isSize(QString const &str) {
    return str == "SIZE";
}

bool isExt(QString const &str) {
    return str == "EXT";
}

bool isType(QString const &str) {
    return str == "TYPE";
}

bool isServerStatus(QString const &str) {
    QStringList status = {"INDEXING", "READY", "STOPPED", "PAUSED", "QUERYING", "RESULTS_AVAILABLE"};
    return status.contains(str);
}

bool isIndexerCommand(QString const &str) {
    QStringList indexer = {"STATUS", "START", "STOP", "PAUSE", "RESUME"};
    return indexer.contains(str);
}

bool isEntity(QString const &str) {
    QStringList Entity = {"WHITELIST", "BLACKLIST", "FILTERS", "SKIPPED_FILTERS"};
    return Entity.contains(str);
}

bool isPath(QString const &str) {
    QStringList Entity = {"WHITELIST", "BLACKLIST", "FILTERS", "SKIPPED_FILTERS"};
    return str != "" && !isEntity(str) ; //
}

void factory() {
    //return action
}



//THREAD
MyThread::MyThread(QObject *parent) : QThread(parent)
{

}

void MyThread::startIndexer()
{
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
    status = "INDEXING";

    if(db.lastError().isValid()){
        qCritical() << "addDatabase" << db.lastError().text();
        //return -1;
    }

    // Init de la base de données
    QString appDataLocation = QStandardPaths::writableLocation(QStandardPaths::AppDataLocation);
    QDir dir(appDataLocation); // Creation du repertoire s'il existe pas
    if(!dir.exists()){
        dir.mkdir(appDataLocation);
        qDebug() << "mkdir" << appDataLocation;
    }

    // Creation fichiers db
    QString dbPath = appDataLocation+"/Indexer.db";
    qDebug() <<"dbPath" << dbPath;
    db.setDatabaseName(dbPath);

    QSqlQuery query;

    // Creation table
    if(!db.open()){
        qCritical() << "Unable to open db" << db.lastError().text() << dbPath;
        //return -2;
    }
    else {

        query.exec("DROP TABLE Indexer");
        qDebug() << __FUNCTION__ << __LINE__ << "creating table 'Indexer'";
        QString tblIndexerCreate = "CREATE TABLE IF NOT EXISTS Indexer("
                                    "GUID INTEGER PRIMARY KEY AUTOINCREMENT,"
                                    "Name STRING,"
                                    "PATH STRING,"
                                    "CreationDate DATE,"
                                    "LastDateUpdate DATE,"
                                    "Ext STRING,"
                                    "Size INT"
                                    ");";

        query.exec(tblIndexerCreate);

    }
    if(query.lastError().isValid()){
        qWarning() << "CREATE TABLE" << query.lastError().text();
        //return -3;
    }

    QElapsedTimer timer;
    timer.start();


    query.exec("pragma temp_store = memory");
    query.exec("PRAGMA synchronous = normal");
    query.exec("pragma mmap_size = 30000000000");
    query.exec("PRAGMA journal_mode = wal");
    if(query.lastError().isValid()){
        qWarning() << "CREATE TABLE" << query.lastError().text();
        //return -3;
    }
    db.transaction();
    query.prepare("INSERT INTO Indexer (name, PATH, CreationDate, LastDateUpdate, Ext, Size)"
                  "VALUES (:Name, :PATH, :CreationDate, :LastDateUpdate, :Ext, :Size)");


    QStringList lines;
    for ( int i=0 ; i< white_list.size() ; i++)
    {
        qDebug() << white_list.value(i);
        QDirIterator itDir(white_list.value(i), QDir::Dirs, QDirIterator::NoIteratorFlags);
        while(itDir.hasNext()){
            QString dirPath = itDir.next();
            bool black_listed = false;
            for ( int j = 0 ; j< black_list.size() ; j++){
                if (dirPath.contains(black_list.value(j))){
                    black_listed = true;
                }
            }
            if (!black_listed){
                QDirIterator itFiles(dirPath, filters, QDir::Files, QDirIterator::Subdirectories);
                while(itFiles.hasNext())
                {

                    QString filePath = itFiles.next();
                    QFile file(filePath);

                    QFileInfo infos(itFiles.filePath());

                    QString nom = infos.baseName();
                    QString Path = itFiles.filePath();
                    QString creationDate = infos.birthTime().toString("yyyy-MM-dd HH:mm:ss");
                    QString lastUpdate = infos.lastModified().toString("yyyy-MM-dd HH:mm:ss");
                    QString ext = infos.completeSuffix();
                    QString size = QString::number(infos.size());
                    QString totalInfos = nom + "," + Path + "," + creationDate + "," + lastUpdate + "," + ext + "," + size;

                    if (!skip_filter.contains("*."+ext)){
                        lines.append(totalInfos);
                    }
                }
            }
        }
    }



    for (int i = 0; i < lines.size(); i++) {

        QStringList splitLine = lines.at(i).split(',');
        query.bindValue(":Name", splitLine[0]);
        query.bindValue(":PATH", splitLine[1]);
        query.bindValue(":CreationDate", splitLine[2]);
        query.bindValue(":LastDateUpdate", splitLine[3]);
        query.bindValue(":Ext", splitLine[4]);
        query.bindValue(":Size", splitLine[5]);
        query.exec();


    }
    db.commit();


    double rate     = 0;
    double iElapsed = double(timer.elapsed()) / 1000;
    if (iElapsed)
        rate = 1000000 / iElapsed;
    timer.restart();
    std::cout << std::fixed << std::setprecision(2) << std::setfill(' ');
    std::cout << "  "
              << " done in " << std::setw(6) << iElapsed << " s - " << std::setw(10) << rate << " inserts/s"
              << std::endl;
    status = "READY";

}


//INDEXER <STATUS|START|STOP|PAUSE|RESUME>
QString MyThread::indexer(const QString &cmd)
{
    if(cmd == "STATUS"){
        return status;
    }
    if(cmd == "START"){
        this->start();
    }
    if(cmd == "STOP"){
        status = "STOPPED";
        this->quit();
    }
    if(cmd == "PAUSE"){
        status = "PAUSED";
        this->wait();
    }
    if(cmd == "RESUME"){
        this->run();
    }
    return status;
}

//GET <WHITELIST|BLACKLIST|FILTERS|SKIPPED_FILTERS>
QStringList MyThread::get(const QString &list)
{
    if(list == "WHITELIST"){
        return white_list;
    }
    if(list == "BLACKLIST"){
        return black_list;
    }
    if(list == "FILTERS"){
        return filters;
    }
    if(list == "SKIPPED_FILTERS"){
        return skip_filter;
    }
    return {};
}

void MyThread::add(const QString &list, const QString &folder)
{
    if(list == "WHITELIST"){
        white_list.append(folder);
    }
    if(list == "BLACKLIST"){
        black_list.append(folder);
    }
    if(list == "FILTERS"){
        filters.append(folder);
    }
    if(list == "SKIPPED_FILTERS"){
        skip_filter.append(folder);
    }
}

void MyThread::clear(const QString &list)
{
    if(list == "WHITELIST"){
        white_list.clear();
    }
    if(list == "BLACKLIST"){
        black_list.clear();
    }
    if(list == "FILTERS"){
        filters.clear();
    }
    if(list == "SKIPPED_FILTERS"){
        skip_filter.clear();
    }
}

QStringList MyThread::search(const QString &file_name, const QString &last_modified, const QString &created, const QString &max_size, const QString &min_size, const QString &size, const QString &ext, const QString &type)
{
    status = "QUERYING";

    QStringList res;
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");


    // Init de la base de données
    QString appDataLocation = QStandardPaths::writableLocation(QStandardPaths::AppDataLocation);
    QDir dir(appDataLocation); // Creation du repertoire s'il existe pas
    if(!dir.exists()){
        qCritical() << "Unable to open db" << db.lastError().text();
    }

    QSqlQuery query;

    // Creation table
    if(!db.open()){
        qCritical() << "Unable to open db" << db.lastError().text();
        //return -2;
    }
    else {
        query.exec("Select * from Indexer");
        while (query.next()) {
            QString totalInfos = query.value(1).toString() + " , " + query.value(2).toString() + " , " + query.value(3).toString() + " , " + query.value(4).toString() + " , " + query.value(5).toString() + " , " + query.value(6).toString();
            res.append(totalInfos);
        }

    }
    status = "RESULTS_AVAILABLE";
    return res;
}

void MyThread::onReceivedQuery(const QString &query)
{
    QString           cmd       = "";
    QString           op1       = "";
    QString           op2       = "";

    QString           status    = "";
    QString           indexer   = "";
    QString           entity    = "";

    QString           last_modified       = "";
    QString           created             = "";
    QString           max_size            = "";
    QString           min_size            = "";
    QString           size                = "";
    QString           ext                 = "";
    QString           type                = "";

    const QStringList tokens    = stringToList(query);
    FSM               fsm;
    for (const auto &token : qAsConst(tokens)) {
        qDebug() << token;
        //  qDebug() << fsm.current_state();
        fsm.checkState(0, 1, isCommand(token));
        fsm.checkState(1, 2, isSearch(token));
        fsm.checkState(1, 3, isStatus(token));
        fsm.checkState(1, 4, isIndexer(token));
        fsm.checkState(1, 5, isClear(token));
        fsm.checkState(1, 6, isGet(token));
        fsm.checkState(1, 7, isAdd(token));

        fsm.checkState(2, 8, isFileNamePart(token));
        fsm.checkState(8, 9, isSearchOption(token));
        fsm.checkState(9, 10, isLastModified(token));
        fsm.checkState(9, 11, isCreated(token));
        fsm.checkState(9, 12, isMaxSize(token));
        fsm.checkState(9, 13, isMinSize(token));
        fsm.checkState(9, 14, isSize(token));
        fsm.checkState(9, 15, isExt(token));
        fsm.checkState(9, 16, isType(token));

        fsm.checkState(3, 17, isServerStatus(token));
        fsm.checkState(4, 18, isIndexerCommand(token));
        fsm.checkState(5, 19, isEntity(token));
        fsm.checkState(6, 20, isEntity(token));
        fsm.checkState(7, 21, isEntity(token));

        fsm.checkState(21, 22, isPath(token));


        switch (fsm.currentState()) {
        case 0:
            qDebug() << "initial";
            break;

        case 1:
            qDebug() << "command";
            cmd = token;
            break;

        case 2:
            qDebug() << "search";
            cmd = token;
            break;

        case 3:
            qDebug() << "status";
            cmd = token;
            break;

        case 4:
            qDebug() << "indexer";
            cmd = token;
            break;

        case 5:
            qDebug() << "clear";
            cmd = token;
            break;

        case 6:
            qDebug() << "get";
            cmd = token;
            break;

        case 7:
            qDebug() << "add";
            cmd = token;
            break;


        case 8:
            qDebug() << "file name part";
            op1 = token;
            break;

        case 9:
            qDebug() << "search options";
            op2 = token;
            break;

        case 10:
            qDebug() << "last modified";
            last_modified = token;
            break;

        case 11:
            qDebug() << "created";
            created = token;
            break;

        case 12:
            qDebug() << "max sized";
            max_size = token;
            break;

        case 13:
            qDebug() << "min sized";
            min_size = token;
            break;

        case 14:
            qDebug() << "size";
            size = token;
            break;

        case 15:
            qDebug() << "ext";
            ext = token;
            break;

        case 16:
            qDebug() << "type";
            type = token;
            break;

        case 17:
            qDebug() << "server status";
            status = token;
            break;

        case 18:
            qDebug() << "indexer command";
            indexer = token;
            break;

        case 19:
            qDebug() << "clear entity";
            entity = token;
            break;

        case 20:
            qDebug() << "get entity";
            entity = token;
            break;

        case 21:
            qDebug() << "add entity";
            entity = token;
            break;

        case 22:
            qDebug() << "add entity path";
            op2 = token;
            break;

        default:
            break;
        }


        qDebug() << fsm.currentState();
    }

    qDebug() <<"cmd"<<           cmd       ;
    qDebug() <<"op1"<<           op1       ;
    qDebug() <<"op2"<<           op2       ;

    qDebug() <<"status"<<           status    ;
    qDebug() <<"indexer"<<           indexer   ;
    qDebug() <<"entity"<<           entity    ;

    qDebug() <<"last_modified"<<           last_modified       ;
    qDebug() <<"created"<<           created             ;
    qDebug() <<"max_size"<<           max_size            ;
    qDebug() <<"min_size"<<           min_size            ;
    qDebug() <<"size"<<           size                ;
    qDebug() <<"ext"<<           ext                 ;
    qDebug() <<"type"<<           type                ;

    qDebug() << "server received" << query;

    switch (fsm.currentState()){
    case 22:
        // add
        qDebug() <<"add";
        this->add(entity, op2);
        emit onSendResult(this->get(entity));
        break;
    case 20:
        //get
        qDebug() <<"get";
        emit onSendResult(this->get(entity));
        break;
    case 19:
        //clear
        qDebug() <<"clear";
        this->clear(entity);
        emit onSendResult(this->get(entity));
        break;
    case 18:
        //indexer
        qDebug() <<"indexer";
        emit onSendResult(QStringList() << this->indexer(indexer));
        break;
    case 17:
        //status
        qDebug() <<"status";
        emit onSendResult(QStringList() << this->indexer(status));
        break;

    case 10: case 11: case 12: case 13: case 14: case 15: case 16:
        //search option
        qDebug() <<"search option";
        emit onSendResult(this->search(op1, last_modified, created, max_size, min_size, size, ext, type));
        break;
    case 8:
        //search without option
        qDebug() <<"search without option";
        emit onSendResult(this->search(op1));
        break;
    }
}

void MyThread::run()
{
    startIndexer();
}


