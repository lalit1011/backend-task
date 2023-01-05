exports.roleBasePermission = {
    user: {
        "role": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ],
        "user": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ],
        "visitor": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ],
        "category": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ]
    },
    manager: {
        "role": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ],
        "user": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ],
        "visitor": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ],
        "category": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ]
    },
    employee: {
        "role": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ],
        "user": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ],
        "visitor": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ],
        "category": [
            {
                "add": false,
                "edit": false,
                "view": false,
                "delete": false
            }
        ]
    },
    admin: {
        "role": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ],
        "user": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ],
        "visitor": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ],
        "category": [
            {
                "add": true,
                "edit": true,
                "view": true,
                "delete": true
            }
        ]
    },
}