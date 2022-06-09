#ifndef MYTHREAD_H
#define MYTHREAD_H

#include <QObject>
#include <QSqlDatabase>
#include <QDebug>
#include <QSqlQueryModel>
#include <QDir>
#include <QThread>
#include <QDirIterator>
#include <QElapsedTimer>
#include <QStandardPaths>
#include <QSqlError>
#include <QSqlQuery>
#include <QStandardPaths>
#include <QString>
#include <QElapsedTimer>
#include <QDateTime>
#include <iomanip>
#include <iostream>
#include <fstream>

class MyThread : public QThread
{
    Q_OBJECT
    QStringList white_list = {"C:/", "D:/Cours/M1"};
    QStringList black_list = {"C:/Windows", "C:/Users", "C:/Qt", "D:/Cours/M1/DevMobile", "C:/Program Files"};
    QStringList filters = {};
    QStringList skip_filter = {"*.exe", "*.obj"};
    QString status;
protected:
    void run();

public:
    explicit MyThread(QObject *parent = nullptr);
    void startIndexer();
    QString indexer(QString const &cmd);
    QStringList get(QString const &list);
    void add(QString const &list, QString const &folder);
    void clear(QString const &list);
    QStringList search(QString const &file_name,
                QString const &last_modified="",
                QString const &created="",
                QString const &max_size="",
                QString const &min_size="",
                QString const &size="",
                QString const &ext="",
                QString const &type="");

signals:
    void onSendResult(const QStringList &value);

public slots:
    void onReceivedQuery(const QString &query);
};

#endif // MYTHREAD_H
