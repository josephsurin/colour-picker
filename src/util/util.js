import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { css } from 'glamor'
import 'react-toastify/dist/ReactToastify.min.css'

export function copycol(val, hex) {
    copy(val)
    toast(`${val} copied to clipboard!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: `${css({ borderLeft: '8px solid ' + hex })} copy-toast`,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        closeButton: false,
        autoClose: 1500
    })
}

export function notify(msg) {
    toast(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: `${css({ borderLeft: '8px solid #95eb85' })} copy-toast`,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        closeButton: false,
        autoClose: 1500
    })
}
