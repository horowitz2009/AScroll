export interface Translation {
    locale: string;
    translation: string;
}

export interface Status {
    id: string;
    translations: Translation[];
}

export const ORDER_STATUSES: Status[] =
    [

        {
            "id": "pending", "translations":
                [{ "locale": "bg", "translation": "Обработва се" },
                { "locale": "en", "translation": "Pending" }
                ]
        },
        {
            "id": "waitingPayment", "translations":
                [{ "locale": "bg", "translation": "Очаква плащане" },
                { "locale": "en", "translation": "Waiting payment" }
                ]
        },
        {
            "id": "preparing", "translations":
                [{ "locale": "bg", "translation": "Приготвя се" },
                { "locale": "en", "translation": "Preparing" }
                ]
        },
        {
            "id": "sent", "translations":
                [{ "locale": "bg", "translation": "Изпратена" },
                { "locale": "en", "translation": "Sent" }
                ]
        },
        {
            "id": "canceled", "translations":
                [{ "locale": "bg", "translation": "Отказана" },
                { "locale": "en", "translation": "Canceled" }
                ]
        },

    ];
