document.addEventListener('DOMContentLoaded',function () {
  // === ハンバーガーメニュー ===
  const headerHTML = `
  <header>
    <div class="header-container">
      <div>
        <a href="../main/index.html">
        <img src="../img/header_banner/top_logo-on.png" alt="和歌山工業高校ロゴ" class="header-logo" />
        </a>
      </div>
      <nav>
        <ul>
          <li class="dropdown">
            <a href="#about">学校紹介</a>
            <div class="dropdown-content">
              <a href="../aisatu/kocho.html">学校長挨拶</a>
              <a href="../enkaku/rekishi_3.html">歴史・沿革</a>
              <a href="../kouka/kouka.html">校歌</a>
              <a href="../schoolpolicy/schoolpolicy.html">教育方針</a>
              <a href="../kyoumu/kyoikukatei.html">教育課程</a>
              <a href="../gyouji/gyouji.html">学校行事</a>
              <a href="../club/index.html">部活動</a>
              <a href="../sinro/sinro.html">進路情報</a>            
              <a href="../hyouka/hyouka.html">学校評価</a>
              <a href="../unei_kyogikai/unei_kyogikai.html">学校運営協議会</a>
              <a href="../tobacco_shotai/tobacco_shotai.html">タバコの正体</a>
              <a href="../map/access.html">アクセス</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="#students">在校生・保護者の方</a>
            <div class="dropdown-content">
              <a href="../soumu/zaikousei.html">在校生の皆さんへ</a>
              <a href="https://forms.office.com/r/51pQGqkD4p">欠席・遅刻の連絡</a>
              <a href="../soumu/syougakukin.html">奨学金のお知らせ</a>
              <a href="../kyoumu/keihou_atukai.pdf">気象警報発令時</a>
              </div>
          </li>
          <li class="dropdown">
            <a href="#graduates">卒業生の方</a>
            <div class="dropdown-content">
              <a href="../jimu/index.html">証明書等の発行手続き</a>
              <a href="../dousoukai/dousoukai.html">同窓会からのお知らせ</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="#admissions">入学・転学希望の方</a>
            <div class="dropdown-content">
              <a href="../soumu/sinnyusei.html">入学希望の皆さんへ</a>
          </li>
          <li class="dropdown">
              <a href="#graduates">その他</a>
              <div class="dropdown-content">
                <a href="../kyoumu/kyouikujissyuu.html">教育実習生の方</a>
              </div>  
          </li>
        </ul>
      </nav>
    </div>
  </header>
  `;
  document.getElementById('header-placeholder').innerHTML = headerHTML;

  const btn = document.querySelector('.btn');
  const header = document.querySelector('header');
  const dropdowns = document.querySelectorAll('.dropdown'); // ドロップダウン要素
 // ハンバーガーメニューの開閉
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    header.classList.toggle('active');
  });
  // ドロップダウンメニューの開閉
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector('a');
    const content = dropdown.querySelector('.dropdown-content');

    link.addEventListener('click', (event) => {
      event.preventDefault();

      // 現在のドロップダウン表示/非表示を切り替え
      content.style.display = content.style.display === 'block' ? 'none' : 'block';

      // 他のドロップダウンを閉じる
      dropdowns.forEach((otherDropdown) => {
        const otherContent = otherDropdown.querySelector('.dropdown-content');
        if (otherDropdown !== dropdown) {
          otherContent.style.display = 'none';
        }
      });
    });
  });

  // 外部をクリックしたときにドロップダウンを閉じる
  document.addEventListener('click', (event) => {
    dropdowns.forEach((dropdown) => {
      const content = dropdown.querySelector('.dropdown-content');
      const link = dropdown.querySelector('a');
      if (!dropdown.contains(event.target) && event.target !== link) {
        content.style.display = 'none';
      }
    });
  });



  // モーダル表示
  const modal = document.getElementById('modal');
  const modalBtn = document.getElementById('modalBtn');
  
  modalBtn.addEventListener('click', function () {
    modal.classList.add('show'); // モーダルのアニメーション表示
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 背景のスクロールを無効化
  });

  // モーダルを閉じる
  const closeBtn = document.querySelector('.close-btn'); 

  closeBtn.addEventListener('click', function () {
    modal.classList.remove('show'); // アニメーションをリセット
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 背景のスクロールを復元
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // 背景のスクロールを復元
    }
  });


  // === スライドショー ===
  const slideImage = document.getElementById('slide-image');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');

  let currentIndex = 0;
  const images = [
    '../img/image1.jfif',
    '../img/image2.jpg',
    '../img/image3.jpg',
    '../img/image4.jpg',
    '../img/image5.jpg',
    '../img/image6.jpg',
    '../img/image7.jpg',
  ];

  // スライドショーの更新
  function updateSlide(index) {
    slideImage.src = images[index];
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide(currentIndex);
  });

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      currentIndex = i;
      updateSlide(currentIndex);
    });
  });

  // 初期スライドの表示
  updateSlide(currentIndex);



  // === 新着情報の表示機能（例: 自動スクロール）===
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    let scrollPos = 0;

    function scrollNews() {
      scrollPos += 1;
      if (scrollPos >= newsContainer.scrollHeight - newsContainer.clientHeight) {
        scrollPos = 0;
      }
      newsContainer.scrollTop = scrollPos;
    }

    setInterval(scrollNews, 50); // スクロール間隔調整
  }
  

});
