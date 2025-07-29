import express from 'express';
import JSZip from 'jszip';
import { optimizeHTML, minifyCSS } from '../services/zipGenerator.js';

const router = express.Router();

router.post('/export', async (req, res) => {
  try {
    const { html, css, assets } = req.body;
    const zip = new JSZip();
    
    // Add HTML
    zip.file("index.html", optimizeHTML(html));
    
    // Add CSS
    zip.file("styles.css", minifyCSS(css));
    
    // Add assets
    const assetsFolder = zip.folder("assets");
    assets.forEach(asset => {
      assetsFolder.file(asset.name, asset.data);
    });
    
    // Generate ZIP
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=rama_website.zip');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

export default router;
