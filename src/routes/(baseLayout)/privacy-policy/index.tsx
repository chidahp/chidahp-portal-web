
export default function PrivacyPolicy() {
  return (
    <>      
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-2xl p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">นโยบายความเป็นส่วนตัว</h1>
          <p class="text-gray-600 mb-8">อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}</p>
          
          <div class="prose prose-lg max-w-none">
            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">1. ข้อมูลที่เรารวบรวม</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อรวบรวมข้อมูลเกี่ยวกับการใช้งานเว็บไซต์ของท่าน 
                ข้อมูลที่เรารวบรวมอาจรวมถึง:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>ข้อมูลการใช้งานเว็บไซต์ (หน้าเว็บที่เยี่ยมชม, เวลาที่ใช้ในแต่ละหน้า)</li>
                <li>ข้อมูลอุปกรณ์และเบราว์เซอร์ (ประเภทอุปกรณ์, ระบบปฏิบัติการ, เบราว์เซอร์)</li>
                <li>ข้อมูลตำแหน่งที่ตั้ง (ประเทศ, เมือง)</li>
                <li>ข้อมูลการอ้างอิง (เว็บไซต์ที่นำท่านมาที่นี่)</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">2. วิธีการใช้ข้อมูล</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                เราใช้ข้อมูลที่รวบรวมได้เพื่อ:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>ปรับปรุงและพัฒนาประสบการณ์การใช้งานเว็บไซต์</li>
                <li>วิเคราะห์การใช้งานเพื่อเข้าใจความต้องการของผู้ใช้</li>
                <li>ปรับปรุงเนื้อหาและฟีเจอร์ของเว็บไซต์</li>
                <li>ตรวจสอบและป้องกันการใช้งานที่ไม่เหมาะสม</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">3. การใช้คุกกี้</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                เราใช้คุกกี้เพื่อ:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>คุกกี้ที่จำเป็น:</strong> เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง</li>
                <li><strong>คุกกี้การวิเคราะห์:</strong> เพื่อวิเคราะห์การใช้งานเว็บไซต์ (Google Analytics)</li>
                <li><strong>คุกกี้การตั้งค่า:</strong> เพื่อจดจำการตั้งค่าของท่าน</li>
              </ul>
              <p class="text-gray-700 leading-relaxed mt-4">
                ท่านสามารถจัดการคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ หรือใช้ปุ่มจัดการคุกกี้ในเว็บไซต์
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">4. การแชร์ข้อมูล</h2>
              <p class="text-gray-700 leading-relaxed">
                เราไม่ขาย แลกเปลี่ยน หรือโอนข้อมูลส่วนบุคคลของท่านให้กับบุคคลที่สาม 
                ยกเว้นในกรณีที่จำเป็นตามกฎหมาย หรือเพื่อการให้บริการที่ท่านร้องขอ
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">5. ความปลอดภัยของข้อมูล</h2>
              <p class="text-gray-700 leading-relaxed">
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของท่าน 
                จากการเข้าถึง การเปลี่ยนแปลง การเปิดเผย หรือการทำลายโดยไม่ได้รับอนุญาต
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">6. สิทธิของท่าน</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                ท่านมีสิทธิ์:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>เข้าถึงข้อมูลส่วนบุคคลของท่าน</li>
                <li>ขอแก้ไขข้อมูลที่ไม่ถูกต้อง</li>
                <li>ขอลบข้อมูลส่วนบุคคล</li>
                <li>คัดค้านการประมวลผลข้อมูล</li>
                <li>ขอถอนความยินยอม</li>
              </ul>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">7. การเปลี่ยนแปลงนโยบาย</h2>
              <p class="text-gray-700 leading-relaxed">
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว 
                การเปลี่ยนแปลงใดๆ จะถูกประกาศในหน้านี้พร้อมวันที่อัปเดต
              </p>
            </section>

            <section class="mb-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">8. การติดต่อ</h2>
              <p class="text-gray-700 leading-relaxed">
                หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ 
                กรุณาติดต่อเราผ่านช่องทางที่ระบุไว้ในเว็บไซต์
              </p>
            </section>

            <div class="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 class="text-lg font-semibold text-blue-800 mb-2">🍪 การจัดการคุกกี้</h3>
              <p class="text-blue-700 text-sm">
                ท่านสามารถจัดการการตั้งค่าคุกกี้ได้ตลอดเวลา โดยการลบคุกกี้ในเบราว์เซอร์ 
                หรือติดต่อเราผ่านช่องทางที่ระบุไว้ในเว็บไซต์ <a href="mailto:chidahp@gmail.com">chidahp@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
