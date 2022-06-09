#ifndef FSM_H
#define FSM_H


class FSM
{
    int m_current_state = 0;
public:
    FSM();
    bool checkState(int from, int to, bool condition);
    int currentState() const;
};

#endif // FSM_H
