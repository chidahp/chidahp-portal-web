export default function Home() {
  return (
    <main class="min-h-screen flex flex-col justify-center items-center bg-yellow-300 text-black px-6 animate-fade-in">
      <div class="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full animate-slide-up">
        <img
          src="/maintainance.jpg"
          alt="Under maintenance illustration"
          class="mx-auto mb-6 w-64 rounded animate-zoom-in"
        />
        <h1 class="text-2xl font-bold mb-2 uppercase animate-fade-in-delay">
          Site Under Maintenance
        </h1>
        <p class="text-gray-600 mb-6 text-sm animate-fade-in-delay-2">
          รอเว็บใหม่เร็วๆนี้
        </p>
        <a
          href="https://playground.chidahp.com"
          target="_blank"
          class="inline-block px-6 py-2 bg-black text-yellow-300 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition animate-bounce-soft"
        >
          ไปเยี่ยมจักรวาลชี้ดาบก่อนได้ที่ playground.chidahp.com คลิก!
        </a>
      </div>

      {/* Footer */}
      <div class="mt-8 text-center animate-fade-in-delay-3">
        <p class="text-sm text-black/60 mb-4">
          © {new Date().getFullYear()} สำนักพิมพ์ชี้ดาบ
        </p>
        <div class="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/chidahp"
            target="_blank"
            class="flex items-center gap-2 text-black hover:text-pink-600 transition"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
            </svg>
            Instagram
          </a>
          <a
            href="https://www.facebook.com/CHIDAHP"
            target="_blank"
            class="flex items-center gap-2 text-black hover:text-blue-600 transition"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </a>
          <a
            href="https://app.chidahp.com/chulo-admission"
            target="_blank"
            class="flex items-center gap-2 text-black hover:text-green-600 transition"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19.665 4.349A10.826 10.826 0 0012 2C6.486 2 2 6.038 2 11c0 2.949 1.506 5.49 3.86 7.246.08.06.17.11.26.16l-.74 2.705 2.78-1.517c1.2.33 2.45.506 3.84.506 5.514 0 10-4.038 10-9s-4.486-9-10-9c-.052 0-.103 0-.154.002a8.756 8.756 0 016.519 2.247zm-5.43 4.201H9.765v1.292h1.687v4.114h1.529v-4.114h1.254V8.55zm-5.185 0H7.271v5.406h1.528V8.55zm8.115 0h-1.573v5.406h1.573V8.55z" />
            </svg>
            LINE ด้อมชูโล่
          </a>
        </div>
      </div>
    </main>
  );
}
