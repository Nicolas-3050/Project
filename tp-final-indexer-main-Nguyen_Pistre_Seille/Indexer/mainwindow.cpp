#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QFileDialog>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
    , _thread(new MyThread)
{
    QObject::connect(_thread, &MyThread::started, this, &MainWindow::jobStarted);
    QObject::connect(_thread, &MyThread::finished, this, &MainWindow::jobFinished);


    QObject::connect(this, &MainWindow::onSendQuery, _thread, &MyThread::onReceivedQuery);
    QObject::connect(_thread, &MyThread::onSendResult, this, &MainWindow::onReceivedResult);


    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::jobStarted()
{
    ui->start->setDisabled(true);
}

void MainWindow::jobFinished()
{
    ui->start->setDisabled(false);
}


void MainWindow::on_start_clicked()
{
    _thread->start();
}


void MainWindow::onReceivedResult(const QStringList &value)
{
    ui->result->clear();
    ui->result->insertItems(0, value);
    qDebug() << __FUNCTION__ << "client received " << value;
}

void MainWindow::on_btn_Commande_clicked()
{
    if(!(ui->Commande->text().isEmpty())){
        qDebug() << __FUNCTION__ << "client send " << ui->Commande->text();
        emit onSendQuery(ui->Commande->text());
    }
}

