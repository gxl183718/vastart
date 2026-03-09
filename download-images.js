import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'images');

// 确保images目录存在
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 下载图片函数
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // 处理重定向
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(filepath);
          });
        }).on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filepath);
        });
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 读取并更新JSON文件
async function updateJsonFiles() {
  console.log('开始下载图片并更新JSON文件...');

  // 下载项目案例图片
  const projectImages = [
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20city%20landmark%20sculpture%20made%20of%20stainless%20steel&image_size=landscape_16_9', filename: 'project-1.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=park%20theme%20sculpture%20with%20natural%20elements&image_size=landscape_16_9', filename: 'project-2.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corporate%20image%20sculpture%20modern%20style&image_size=landscape_16_9', filename: 'project-3.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=historical%20cultural%20sculpture%20traditional%20style&image_size=landscape_16_9', filename: 'project-4.jpg' }
  ];

  // 下载工艺品图片
  const artworkImages = [
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20art%20sculpture%20bronze%20material&image_size=square', filename: 'artwork-1.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20minimalist%20sculpture%20stainless%20steel&image_size=square', filename: 'artwork-2.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20craft%20sculpture&image_size=square', filename: 'artwork-3.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20art%20sculpture%20mixed%20materials&image_size=square', filename: 'artwork-4.jpg' }
  ];

  // 下载其他图片
  const otherImages = [
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sculpture%20artists%20working%20in%20studio&image_size=portrait_4_3', filename: 'team.jpg' },
    { url: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sculpture%20studio%20workshop%20artistic%20atmosphere&image_size=landscape_16_9', filename: 'hero-bg.jpg' }
  ];

  // 下载所有图片
  console.log('下载项目案例图片...');
  for (const img of projectImages) {
    try {
      await downloadImage(img.url, img.filename);
      console.log(`✓ 已下载: ${img.filename}`);
    } catch (error) {
      console.error(`✗ 下载失败: ${img.filename}`, error.message);
    }
  }

  console.log('下载工艺品图片...');
  for (const img of artworkImages) {
    try {
      await downloadImage(img.url, img.filename);
      console.log(`✓ 已下载: ${img.filename}`);
    } catch (error) {
      console.error(`✗ 下载失败: ${img.filename}`, error.message);
    }
  }

  console.log('下载其他图片...');
  for (const img of otherImages) {
    try {
      await downloadImage(img.url, img.filename);
      console.log(`✓ 已下载: ${img.filename}`);
    } catch (error) {
      console.error(`✗ 下载失败: ${img.filename}`, error.message);
    }
  }

  // 更新projects.json
  console.log('更新projects.json...');
  const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf8'));
  
  projectsData.zh.forEach((project, index) => {
    project.image = `images/project-${index + 1}.jpg`;
  });
  
  projectsData.en.forEach((project, index) => {
    project.image = `images/project-${index + 1}.jpg`;
  });
  
  fs.writeFileSync(path.join(__dirname, 'data', 'projects.json'), JSON.stringify(projectsData, null, 2));
  console.log('✓ projects.json 已更新');

  // 更新artworks.json
  console.log('更新artworks.json...');
  const artworksData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'artworks.json'), 'utf8'));
  
  artworksData.zh.forEach((artwork, index) => {
    artwork.image = `images/artwork-${index + 1}.jpg`;
  });
  
  artworksData.en.forEach((artwork, index) => {
    artwork.image = `images/artwork-${index + 1}.jpg`;
  });
  
  fs.writeFileSync(path.join(__dirname, 'data', 'artworks.json'), JSON.stringify(artworksData, null, 2));
  console.log('✓ artworks.json 已更新');

  // 更新index.html
  console.log('更新index.html...');
  let htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  // 替换英雄区域背景图片
  htmlContent = htmlContent.replace(
    /url\('https:\/\/trae-api-cn\.mchost\.guru\/api\/ide\/v1\/text_to_image\?prompt=sculpture%20studio%20workshop%20artistic%20atmosphere&image_size=landscape_16_9'\)/g,
    "url('images/hero-bg.jpg')"
  );
  
  // 替换关于我们区域的图片
  htmlContent = htmlContent.replace(
    /src="https:\/\/trae-api-cn\.mchost\.guru\/api\/ide\/v1\/text_to_image\?prompt=sculpture%20artists%20working%20in%20studio&image_size=portrait_4_3"/g,
    'src="images/team.jpg"'
  );
  
  fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
  console.log('✓ index.html 已更新');

  console.log('\n所有图片已下载并更新完成！');
}

updateJsonFiles().catch(console.error);