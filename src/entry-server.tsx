// index.tsx หรือ root entry point สำหรับ SolidStart app

import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="th">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="ชี้ดาบ (ธีรนัย โสตถิปิณฑะ)" />
          <meta name="publisher" content="สำนักพิมพ์ชี้ดาบ" />

          <title>ชี้ดาบ | สำนักพิมพ์ที่เขียนชีวิตให้เป็นเรื่อง</title>
          <meta
            name="description"
            content="ชี้ดาบ สำนักพิมพ์อิสระจากเชียงใหม่ ที่เปลี่ยนเรื่องราวของชีวิต การเดินทาง และวัฒนธรรม ให้กลายเป็นหนังสือที่ช่วยให้คุณค้นพบตัวเอง"
          />
          <meta
            name="keywords"
            content="สำนักพิมพ์ชี้ดาบ, หนังสือเดินทาง, แรงบันดาลใจ, พัฒนาตัวเอง, ชีวิตต่างประเทศ, ชี้ดาบ, เจม, Route13, อินเดีย, ญี่ปุ่น, อเมริกา"
          />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.chidahp.com/" />
          <meta property="og:title" content="ชี้ดาบ | สำนักพิมพ์ที่ว่าด้วยการเติบโต" />
          <meta
            property="og:description"
            content="สำนักพิมพ์ที่ว่าด้วยการเติบโต ที่ถ่ายทอดประสบการณ์จริงผ่านหนังสือ เปลี่ยนความเศร้า ความล้มเหลว และการเดินทาง ให้กลายเป็นความเข้าใจชีวิต"
          />
          <meta property="og:image" content="/chidahp.webp" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://www.chidahp.com/" />
          <meta name="twitter:title" content="ชี้ดาบ | สำนักพิมพ์ที่ว่าด้วยการเติบโต" />
          <meta
            name="twitter:description"
            content="สำนักพิมพ์ที่ว่าด้วยการเติบโต ที่ถ่ายทอดประสบการณ์จริงผ่านหนังสือ เปลี่ยนความเศร้า ความล้มเหลว และการเดินทาง ให้กลายเป็นความเข้าใจชีวิต"
          />
          <meta name="twitter:image" content="/chidahp.webp" />

          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
