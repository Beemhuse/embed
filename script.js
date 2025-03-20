(function () {
    // Default configuration
    const defaults = {
      defaultTheme: 'light',
      allowFontChange: true,
      allowColorChange: true,
      allowReset: true,
    };
  
    // Initialize the tool
    window.CustomizationTool = function (options) {
      const config = { ...defaults, ...options };
  
      // Create the floating icon
      const icon = document.createElement('div');
      icon.id = 'customization-icon';
      icon.innerHTML = '🎨';
      icon.style.position = 'fixed';
      icon.style.bottom = '20px';
      icon.style.right = '20px';
      icon.style.backgroundColor = '#3498db';
      icon.style.color = 'white';
      icon.style.width = '50px';
      icon.style.height = '50px';
      icon.style.borderRadius = '50%';
      icon.style.display = 'flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
      icon.style.fontSize = '24px';
      icon.style.cursor = 'pointer';
      icon.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
      icon.style.zIndex = '1000';
      document.body.appendChild(icon);
  
      // Create the customization menu
      const menu = document.createElement('div');
      menu.id = 'customization-menu';
      menu.style.position = 'fixed';
      menu.style.bottom = '80px';
      menu.style.right = '20px';
      menu.style.backgroundColor = 'white';
      menu.style.padding = '20px';
      menu.style.border = '1px solid #ccc';
      menu.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
      menu.style.borderRadius = '8px';
      menu.style.width = '250px';
      menu.style.display = 'none'; // Hidden by default
      menu.style.zIndex = '1000';
      menu.innerHTML = `
        <h3>Customize Website</h3>
        <label for="theme">Theme:</label>
        <select id="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
        <label for="primary-color">Primary Color:</label>
        <input type="color" id="primary-color" value="#3498db">
        <label for="font-size">Font Size:</label>
        <input type="range" id="font-size" min="12" max="24" value="16">
        <label for="font-family">Font Family:</label>
        <select id="font-family">
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Courier, monospace">Courier</option>
        </select>
        <button id="reset">Reset</button>
      `;
      document.body.appendChild(menu);
  
      // Toggle menu visibility
      icon.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      });
  
      // Apply styles to the website
      const applyStyles = (styles) => {
        Object.assign(document.body.style, styles);
      };
  
      // Load saved preferences
      const savedTheme = localStorage.getItem('theme');
      const savedPrimaryColor = localStorage.getItem('primaryColor');
      const savedFontSize = localStorage.getItem('fontSize');
      const savedFontFamily = localStorage.getItem('fontFamily');
  
      if (savedTheme) {
        document.getElementById('theme').value = savedTheme;
        applyTheme(savedTheme);
      }
      if (savedPrimaryColor) {
        document.getElementById('primary-color').value = savedPrimaryColor;
        applyStyles({ color: savedPrimaryColor });
      }
      if (savedFontSize) {
        document.getElementById('font-size').value = savedFontSize;
        applyStyles({ fontSize: `${savedFontSize}px` });
      }
      if (savedFontFamily) {
        document.getElementById('font-family').value = savedFontFamily;
        applyStyles({ fontFamily: savedFontFamily });
      }
  
      // Theme Selector
      document.getElementById('theme').addEventListener('change', (e) => {
        const theme = e.target.value;
        localStorage.setItem('theme', theme);
        applyTheme(theme);
      });
  
      // Primary Color Picker
      document.getElementById('primary-color').addEventListener('input', (e) => {
        const color = e.target.value;
        localStorage.setItem('primaryColor', color);
        applyStyles({ color });
      });
  
      // Font Size Slider
      document.getElementById('font-size').addEventListener('input', (e) => {
        const fontSize = e.target.value;
        localStorage.setItem('fontSize', fontSize);
        applyStyles({ fontSize: `${fontSize}px` });
      });
  
      // Font Family Selector
      document.getElementById('font-family').addEventListener('change', (e) => {
        const fontFamily = e.target.value;
        localStorage.setItem('fontFamily', fontFamily);
        applyStyles({ fontFamily });
      });
  
      // Reset Button
      document.getElementById('reset').addEventListener('click', () => {
        localStorage.clear();
        location.reload(); // Reload the page to reset styles
      });
  
      // Apply theme
      function applyTheme(theme) {
        if (theme === 'dark') {
          applyStyles({
            backgroundColor: '#222',
            color: '#fff',
          });
        } else if (theme === 'light') {
          applyStyles({
            backgroundColor: '#fff',
            color: '#000',
          });
        }
      }
    };
  })();