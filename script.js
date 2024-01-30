let images = []; // 初始化陣列

// AJAX請求從伺服器獲取圖片URL
function fetchImages() {
  fetch(
    "https://script.google.com/macros/s/AKfycbx7gmCRh3kx_1X4n4ffNmj0TXZ0AhwKwIWhDp9ge6yojGKfogArrBxgUmKD01xR5iLV1A/exec"
  )
    .then((response) => response.json())
    .then((data) => {
      data.folders.forEach((folder) => {
        folder.photos.forEach((photoUrl) => {
          images.push(photoUrl);
        });
      });
      loadMoreImages(); // 初次加載圖片
    });
}

fetchImages();

// 2. 檢查是否滾動到螢幕的底端了
function isScrollBottom() {
  // 視窗移動多少
  let screen_move = window.innerHeight + window.scrollY;
  // 文件高度
  let doc_height = document.body.offsetHeight;

  // 如果比較出來是true，代表已滑動到螢幕底端
  return screen_move >= doc_height;
}

// 3. 加載圖片
let index = 0; // 計數器
function loadMoreImages() {
  console.log("執行載入");
  for (let i = 0; i < 6; i++) {
    // 一次載入6張
    // 如果全部的照片加載完成，就取消迴圈
    if (index >= images.length) {
      break;
    }
    // 鎖定要新增照片的位置
    let img_container = document.getElementById("img-container");
    // 照片的元素
    let img_col = `\
      <div class="col-lg-4 img-section">
        <img class="art-img shadow" src="${images[index]}" alt="">
      </div>`;

    // 把照片附加到鎖定的位置
    img_container.innerHTML += img_col;
    // 計數器增加
    index++;
  }
}

// 4. 加入事件監聽，監聽scroll事件
let debounceTimer;
window.addEventListener("scroll", function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function () {
    if (isScrollBottom()) {
      console.log(`共${images.length}張，已載入${index}`);
      loadMoreImages();
    }
  }, 600); //防抖動，600毫秒
});
