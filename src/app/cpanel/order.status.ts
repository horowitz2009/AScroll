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

export class OrderStatusUtils {
  static translate( status: string, localeId: string ) {
      console.log("translate status " + status);
      const st: Status = ORDER_STATUSES.find( s => s.id === status );
      if ( st !== null ) {
          let t: Translation = st.translations.find( tr => tr.locale === localeId );
          if ( t !== null ) {
              return t.translation;
          } else {
              t = st.translations.find( tr => tr.locale === 'bg' );
              return t.translation;
          }
      }
      //returns the original status only if it failed to find translation
      return status;
  }     
}
