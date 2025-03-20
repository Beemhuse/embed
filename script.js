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
  
      // Create Shadow DOM
      const shadowHost = document.createElement('div');
      document.body.appendChild(shadowHost);
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
  
      // Add styles to Shadow DOM
      const styles = `
        :host {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        #customization-icon {
          background: #3498db;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        #customization-menu {
          display: none;
          position: absolute;
          bottom: 60px;
          right: 0;
          background: white;
          padding: 20px;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          width: 250px;
        }
        #customization-menu label {
          display: block;
          margin-top: 10px;
        }
        #customization-menu input,
        #customization-menu select {
          width: 100%;
          margin-top: 5px;
        }
        #customization-menu button {
          margin-top: 15px;
          padding: 8px 12px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        #customization-menu button:hover {
          background: #2980b9;
        }
      `;
      shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div id="customization-icon">🎨</div>
        <div id="customization-menu">
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
        </div>
      `;
  
      // Toggle Menu Visibility
      shadowRoot.getElementById('customization-icon').addEventListener('click', () => {
        const menu = shadowRoot.getElementById('customization-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      });
  
      // Apply Customizations
      const applyStyles = (property, value) => {
        document.documentElement.style.setProperty(property, value);
      };
  
      // Theme Selector
      shadowRoot.getElementById('theme').addEventListener('change', (e) => {
        const theme = e.target.value;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
  
        if (theme !== 'custom') {
          const defaultColor = theme === 'dark' ? '#333' : '#3498db';
          applyStyles('--primary-color', defaultColor);
          shadowRoot.getElementById('primary-color').value = defaultColor;
          localStorage.setItem('primaryColor', defaultColor);
        }
      });
  
      // Primary Color Picker
      shadowRoot.getElementById('primary-color').addEventListener('input', (e) => {
        const color = e.target.value;
        applyStyles('--primary-color', color);
        localStorage.setItem('primaryColor', color);
      });
  
      // Font Size Slider
      shadowRoot.getElementById('font-size').addEventListener('input', (e) => {
        const fontSize = e.target.value + 'px';
        applyStyles('--font-size', fontSize);
        localStorage.setItem('fontSize', fontSize);
      });
  
      // Font Family Selector
      shadowRoot.getElementById('font-family').addEventListener('change', (e) => {
        const fontFamily = e.target.value;
        applyStyles('--font-family', fontFamily);
        localStorage.setItem('fontFamily', fontFamily);
      });
  
      // Reset Button
      shadowRoot.getElementById('reset').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
      });
  
      // Load Saved Preferences
      const savedTheme = localStorage.getItem('theme');
      const savedPrimaryColor = localStorage.getItem('primaryColor');
      const savedFontSize = localStorage.getItem('fontSize');
      const savedFontFamily = localStorage.getItem('fontFamily');
  
      if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedPrimaryColor) applyStyles('--primary-color', savedPrimaryColor);
      if (savedFontSize) applyStyles('--font-size', savedFontSize);
      if (savedFontFamily) applyStyles('--font-family', savedFontFamily);
    };
  })();