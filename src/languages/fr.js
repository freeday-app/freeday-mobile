export default {
    date: {
        format: 'DD/MM/YYYY',
        period: 'du %s au %s'
    },
    auth: {
        title: 'authentification',
        url: 'instance URL',
        username: "nom d'utilisateur",
        password: 'mot de passe',
        login: 'se connecter',
        logout: 'se déconnecter',
        error: {
            login: "erreur d'authentification",
            invalidUrl: 'URL invalide'
        }
    },
    language: {
        title: 'langue',
        en: 'anglais',
        fr: 'français'
    },
    button: {
        submit: 'valider',
        cancel: 'annuler',
        clear: 'effacer',
        select: 'sélectionner',
        selectItem: 'sélectionner un item',
        selectItems: 'sélectionner des items',
        selectDate: 'sélectionner une date',
        selectPeriod: 'sélectionner une période'
    },
    filter: {
        field: {
            period: 'période',
            types: "types d'absence",
            users: 'utilisateurs Slack',
            status: 'statut'
        },
        error: {
            getData: 'erreur lors de la récupération des données du filtre'
        }
    },
    home: {
        title: 'accueil',
        hello: 'bonjour %s',
        error: {
            getData: 'erreur de récupération des données utilisateur',
            action: "erreur lors de l'action sur une absence"
        }
    },
    daysoff: {
        title: 'absences',
        column: {
            user: 'utilisateur',
            date: 'date',
            type: 'type',
            status: 'statut'
        },
        status: {
            confirmed: 'confirmé',
            canceled: 'annulé'
        },
        action: {
            confirm: 'confirmer',
            cancel: 'annuler',
            reset: 'réinitialiser'
        },
        error: {
            getData: 'erreur de récupération des absences'
        }
    },
    settings: {
        title: 'réglages',
        darkTheme: 'thème sombre'
    }
};
