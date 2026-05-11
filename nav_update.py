import os
import re

count_total = 0
for f_name in os.listdir('.'):
    if f_name.endswith('.html'):
        with open(f_name, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # Remove Login link from navbar
        # It looks like:
        # <a href="login.html"
        #     class="text-sm font-medium hover:text-neonPurple transition-colors">Login</a>
        content = re.sub(r'\s*<a href="login\.html"\s*class="text-sm font-medium hover:text-neonPurple transition-colors">Login</a>', '', content, flags=re.DOTALL)
        
        # Also handle any cases where class is slightly different but it's clearly the navbar login
        # e.g., `<a href="login.html" class="text-sm font-medium hover:text-neonPurple transition-colors">Login</a>`
        
        # Change Join to Signup in the navbar signup button
        content = re.sub(r'(<a href="signup\.html"\s*class="[^"]*">)Join(</a>)', r'\1Signup\2', content)
        
        if content != original_content:
            with open(f_name, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            print('Updated ' + f_name)
            count_total += 1
            
print('Total updated: ' + str(count_total))
