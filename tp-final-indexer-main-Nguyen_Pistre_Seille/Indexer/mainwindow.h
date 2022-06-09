#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include"mythread.h"
#include <QMainWindow>
#include <QFileInfo>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

signals:
    void onSendQuery(const QString &value);

public slots:
    void onReceivedResult(const QStringList &value);

private slots:

    void jobStarted();
    void jobFinished();

    void on_start_clicked();

    void on_btn_Commande_clicked();

private:
    Ui::MainWindow *ui;
    MyThread * _thread;

};
#endif // MAINWINDOW_H
