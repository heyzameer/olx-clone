# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
To **upload media to Cloudinary**, there are a few main ways to do it depending on your use case (e.g., from browser, server, or command line). Here’s a simplified guide to get you started:

---


### 🧑‍💻 **Direct Upload from Browser (Unsigned Upload)**

1. **Enable unsigned upload:**
   - Go to **Cloudinary Console > Settings > Upload > Upload Presets**.
   - Create a new **unsigned preset** (give it a name like `unsigned_preset_1`).

2. **HTML + JS for browser upload:**
   ```html
   <input type="file" id="fileUpload" />
   <script>
     document.getElementById('fileUpload').addEventListener('change', async (e) => {
       const file = e.target.files[0];
       const formData = new FormData();
       formData.append('file', file);
       formData.append('upload_preset', 'unsigned_preset_1');

       const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
         method: 'POST',
         body: formData
       });

       const data = await res.json();
       console.log(data.secure_url); // URL of uploaded image
     });
   </script>
   ```

---

### 🧰 **Other Upload Methods**

- **cURL:**
   ```bash
   curl https://api.cloudinary.com/v1_1/your_cloud_name/image/upload \
     -X POST \
     -F "file=@/path/to/image.jpg" \
     -F "upload_preset=unsigned_preset_1"
   ```

- **Large file (videos etc.):**
   ```js
   cloudinary.uploader.upload_large("my_video.mp4", {
     resource_type: "video"
   }, function(error, result) {
     console.log(result, error);
   });
   ```

---

### 🛠️ Tips

- Use **authenticated uploads** for full control (e.g., naming, transformations).
- Use **unsigned uploads** for safer, client-side uploads.
- Use **upload presets** to define rules for unsigned uploads.
- Use **SDKs** for languages like Node.js, Python, PHP, etc., to avoid manually creating timestamps and signatures.

