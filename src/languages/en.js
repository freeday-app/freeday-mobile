export default {
    date: {
        format: 'YYYY-MM-DD',
        period: 'from %s to %s',
        periodFrom: 'from %s',
        periodTo: 'to %s'
    },
    month: {
        1: 'january',
        2: 'february',
        3: 'march',
        4: 'april',
        5: 'may',
        6: 'june',
        7: 'july',
        8: 'august',
        9: 'september',
        10: 'october',
        11: 'november',
        12: 'december'
    },
    auth: {
        title: 'authentication',
        url: 'URL instance',
        username: 'username',
        password: 'password',
        login: 'login',
        logout: 'logout',
        error: {
            login: 'authentification error',
            invalidUrl: 'invalid url'
        }
    },
    language: {
        title: 'language',
        en: 'english',
        fr: 'french'
    },
    button: {
        submit: 'submit',
        cancel: 'cancel',
        clear: 'clear',
        select: 'select',
        selectItem: 'select an item',
        selectItems: 'select items',
        selectDate: 'select a date',
        selectPeriod: 'select a period'
    },
    filter: {
        field: {
            period: 'period',
            types: 'dayoff types',
            users: 'Slack users',
            status: 'status'
        },
        error: {
            getData: 'error while getting filter data'
        }
    },
    home: {
        title: 'monthly report',
        hello: 'hello %s',
        error: {
            getData: 'error while getting user data',
            action: 'error while taking action on dayoff'
        }
    },
    daysoff: {
        title: 'daysoff',
        column: {
            user: 'user',
            date: 'date',
            type: 'type',
            status: 'status'
        },
        status: {
            confirmed: 'confirmed',
            canceled: 'canceled',
            pending: 'pending'
        },
        action: {
            confirm: 'confirm',
            cancel: 'cancel',
            reset: 'reset'
        },
        error: {
            getData: 'error while getting daysoff'
        }
    },
    settings: {
        title: 'settings',
        darkTheme: 'dark theme'
    },
    metric: {
        total: 'total'
    }
};
