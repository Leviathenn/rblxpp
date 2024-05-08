/**
 * @author Leviathenn
*/

#include <windows.h>

int MSG_YN(LPCSTR Message, LPCSTR Caption){
    return MessageBoxA(
        NULL,
        Message,
        Caption,
        MB_YESNO
    );
}
int MSG_YNC(LPCSTR Message, LPCSTR Caption){
    return MessageBoxA(
        NULL,
        Message,
        Caption,
        MB_YESNOCANCEL
    );
}
int MSG_OK(LPCSTR Message, LPCSTR Caption){
    return MessageBoxA(
        NULL,
        Message,
        Caption,
        MB_OK
    );
}


