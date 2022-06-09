#include "fsm.h"


FSM::FSM()
{

}

bool FSM::checkState(int from, int to, bool condition)
{
    if (m_current_state == from && condition) {
        m_current_state = to;
        return true;
    }
    return false;

}

int FSM::currentState() const
{
    return m_current_state;
}
