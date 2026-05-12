import os

button_html = """
    <!-- Back to Top Button -->
    <button id="back-to-top" class="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-deepBlack/80 backdrop-blur-md text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transform translate-y-20 opacity-0 transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] focus:outline-none flex items-center justify-center border border-white/10">
        <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle class="text-white/10" stroke="currentColor" stroke-width="4" fill="transparent" r="45" cx="50" cy="50"></circle>
            <circle id="back-to-top-progress" class="text-neonPurple transition-all duration-100" stroke="currentColor" stroke-width="4" stroke-dasharray="283" stroke-dashoffset="283" stroke-linecap="round" fill="transparent" r="45" cx="50" cy="50"></circle>
        </svg>
        <i class="ri-arrow-up-line text-2xl relative z-10"></i>
    </button>
"""

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old button if exists
        if '<!-- Back to Top Button -->' in content:
            import re
            content = re.sub(r'<!-- Back to Top Button -->.*?<i class="ri-arrow-up-line text-xl"></i>\s*</button>', '', content, flags=re.DOTALL)
            
        if '</body>' in content:
            new_content = content.replace('</body>', button_html + '</body>')
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
