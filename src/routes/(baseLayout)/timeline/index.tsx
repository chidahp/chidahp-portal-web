import { For } from "solid-js";
import Seo from "../../../components/SEO";
import { breadcrumbSchema } from "../../../utils/structuredData";

const timeline = [
  {
    year: "2007",
    title: "เจมไปเป็นนักเรียนแลกเปลี่ยนที่อเมริกา",
    desc: "จุดเริ่มต้นของ “เจม” ในอเมริกา เมล็ดเรื่องราวและธีมการค้นหาตัวตน",
    align: "start",
  },
  {
    year: "2008",
    title: "เจมกลับมาไทยในฐานะเด็กเลี่ยม",
    desc: "",
    align: "end",
  },
  {
    year: "2012",
    title: "เจมไปโครงการเวิร์กแอนด์ทราเวล",
    desc: "",
    align: "start",
  },
  {
    year: "2014",
    title: "ออกหนังสือ ‘1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 1: homecoming’",
    desc: "งานเปิดตัวชี้ดาบแนว coming-of-age ขายยาวนาน (พิมพ์ซ้ำหลายรอบ)",
    align: "end",
  },
  {
    year: "2015",
    title: "ออกหนังสือ ‘1 ปี… 2: coming home’",
    desc: "ครึ่งหลังของชีวิตนักเรียนแลกเปลี่ยน เน้นการยอมรับตัวเอง",
    align: "start",
  },
  {
    year: "2016",
    title: "ออกหนังสือ ‘ตามติดชีวิตอินเดีย’ (ขิม)",
    desc: "เล่าอินเดียแบบขำ-อุ่นใจ ขยายจักรวาลนักเขียนชี้ดาบ",
    align: "end",
  },
  {
    year: "2016",
    title: "ออกหนังสือ ‘ไปญี่ปุ่นด้วยเงิน 7,000’",
    desc: "ทริปงบต่ำที่บานปลาย กลายเป็นเล่มเล่าเรื่องสนุกอ่านง่าย",
    align: "end",
  },
  {
    year: "2016",
    title: "เจมไปซ้อนมอเตอร์ไซค์ท้อปข้ามทวีปอเมริกา",
    desc: "ทริปงบต่ำที่บานปลาย กลายเป็นเล่มเล่าเรื่องสนุกอ่านง่าย",
    align: "end",
  },
  {
    year: "2017",
    title: "ออกหนังสือ เนิร์ดคลั่ง แว้นผ่าทวีป , ‘ROUTE 13: part one’",
    desc: "มอเตอร์ไซค์ข้ามอเมริกา—เส้นเรื่อง “กลัวแต่ไปต่อ” กลายเป็นลายเซ็นชี้ดาบ",
    align: "start",
  },
  {
    year: "2018",
    title: "เจมพัง ออกหนังสือ 'พังเรนเจอร์'",
    desc: "",
    align: "end",
  },
  {
    year: "2018",
    title: "เจมเปิด office ครั้งที่ 1",
    desc: "",
    align: "end",
  },
  {
    year: "2018",
    title: "ออกหนังสือ ROUTE 13: part two, เอเลี่ยนในซานฟรานซิสโก",
    desc: "",
    align: "end",
  },
  {
    year: "2019",
    title: "เจม ปิด office ครั้งที่ 1",
    desc: "",
    align: "start",
  },
  {
    year: "2019",
    title: "",
    desc: "เจมเดินทางไปงานแต่งสตีฟด้วยเงินก้อนสุดท้าย",
    align: "start",
  },
  {
    year: "2020",
    title: "โควิด 😷",
    desc: "",
    align: "start",
  },
  {
    year: "2021 - 2022",
    title: "ยุคโควิด: กลยุทธ์ออนไลน์",
    desc: "ไลฟ์/อ่านฟรี + โพสต์คอนเทนต์ ทำให้ยอดขายออนไลน์พุ่ง",
    align: "end",
  },
  {
    year: "2022 - 2024",
    title: "โฟกัสอีเวนต์บูธ & Cardtel",
    desc: "ระบบ “เลือกการ์ดจากความรู้สึก” → แนะนำเล่ม สร้างเอกลักษณ์หน้าบูธ",
    align: "start",
  },
  {
    year: "ตุลาคม 2024",
    title: "10 ปี ชี้่ดาบ & รีเซ็ตระบบ",
    desc: "ยอดบูธไม่ถึงเป้า → ปรับองค์กรเป็นโซโล่ + ใช้ AI จัดการงาน ลดต้นทุน ~50%",
    align: "end",
  },
  {
    year: "2024 - ปัจจุบัน",
    title: "แปล/อีบุ๊กภาษาอังกฤษ",
    desc: "เริ่มทยอยทำเวอร์ชันอังกฤษของทุกเล่ม เพื่อขยายฐานผู้อ่าน",
    align: "start",
  },
  {
    year: "2025 (ต้นปี)",
    title: "พ็อดแคสต์ชี้ดาบโตแบบออร์แกนิก",
    desc: "คลิปยาวเล่า “ความจริง-ความรู้สึก” AVD สูง สร้างยอดขายหนังสือทางอ้อม",
    align: "end",
  },
  {
    year: "2025 Part 2",
    title: "โฟกัสคุณภาพชีวิตผู้เขียน",
    desc: "วินัยเช้า-เขียนงาน + ระบบดูแลตัวเอง เพื่อรักษาไฟระยะยาว",
    align: "start",
  },
  {
    year: "2025 Part 3",
    title: "บทบาทในวงการสำนักพิมพ์",
    desc: "ทำงานเชิงระบบ/สันติ กับสมาคมผู้จัดพิมพ์ ช่วยออกแบบการทำงานร่วมกัน",
    align: "start",
  },
  {
    year: "2025 Part 4",
    title: "โปรเจ็กต์ ‘South Dakota 18+’",
    desc: "เล่าเส้นทางทำงาน-เงิน-เสรีภาพ-ความผิดพลาด (โทนจริง ดิบ หนัก) ใกล้จบ",
    align: "start",
  },
  {
    year: "2025 Part 5",
    title: "Roadmap สินค้า/สื่อใหม่",
    desc: "ทำ English Editions, วางแผนคอมิกสไตล์ชี้ดาบ, พัฒนาพ็อดแคสต์เป็นซีรีส์ยาว",
    align: "end",
  },
  {
    year: "To be continued...",
    title: "Bi-annual ชุดหนังสือชี้ดาบ",
    desc: "กลยุทธ์ “ออกน้อยแต่ยืนยาว” ให้ผู้อ่านกลับมาต่อเล่มอื่นในจักรวาลเดียวกัน",
    align: "start",
  },
];

export default function TimelinePage() {
  // Create structured data for this page
  const structuredData = () => {
    const breadcrumbs = breadcrumbSchema([
      { name: "หน้าแรก", url: "https://www.chidahp.com/home" },
      { name: "เส้นทางชี้ดาบ", url: "https://www.chidahp.com/timeline" }
    ]);
    
    return [breadcrumbs];
  };

  return (
    <>
      <Seo 
        title="เส้นทางชี้ดาบ | Timeline การเติบโตของสำนักพิมพ์"
        description="ติดตามเส้นทางการเติบโตของชี้ดาบ ตั้งแต่ปี 2007 จนถึงปัจจุบัน เรื่องราวการเดินทาง การเรียนรู้ และการเติบโต"
        keywords="เส้นทางชี้ดาบ, timeline, ประวัติชี้ดาบ, การเติบโต, สำนักพิมพ์, เจม, การเดินทาง"
        url="https://www.chidahp.com/timeline"
        type="website"
        structuredData={structuredData()}
      />
      <main class="max-w-4xl mx-auto px-4 py-12">
      <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <For each={timeline}>
          {(item) => (
            <li>
              <hr />
              <div class="timeline-middle">
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-6 w-6 text-yellow-500"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  />
                </svg>
              </div>

              <div
                class={`timeline-${item.align} mb-10 w-full ${
                  item.align === "start"
                    ? "md:text-end text-left"
                    : "text-left md:text-left"
                }`}
              >
                <time class="font-mono text-sm text-gray-500 block">{item.year}</time>
                <div class="text-lg font-bold mt-1 text-gray-900">{item.title}</div>
                <p class="text-gray-600 mt-2">{item.desc}</p>
              </div>
              <hr />
            </li>
          )}
        </For>
      </ul>
      <div class="text-center mt-12 text-gray-500 italic">
        — ชี้ดาบยังคงเดินทางต่อไป —
      </div>
    </main>
    </>
  );
}
