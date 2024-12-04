document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const modalBtn = document.getElementById('modalBtn');
  const closeBtn = document.querySelector('.close-btn');
  const dropdowns = document.querySelectorAll('.dropdown');

  // モーダル表示
  modalBtn.addEventListener('click', function () {
    modal.classList.add('show'); // モーダルのアニメーション表示
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // 背景のスクロールを無効化
  });

  // モーダルを閉じる
  // モーダル非表示時のスクロール復元
  closeBtn.addEventListener('click', function () {
    modal.classList.remove('show'); // アニメーションをリセット
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 背景のスクロールを復元  
  });

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // 背景のスクロールを復元
    }
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('a'); // 親リンク
    const content = dropdown.querySelector('.dropdown-content'); // ドロップダウンメニュー

    trigger.addEventListener('click', (e) => {
      e.preventDefault(); // デフォルトのリンク動作を防止
      const isVisible = content.style.display === 'block';

      // すべてのドロップダウンメニューを非表示にする
      document.querySelectorAll('.dropdown-content').forEach((menu) => {
        menu.style.display = 'none';
      });

      // 現在のメニューを表示または非表示に切り替える
      if (!isVisible) {
        content.style.display = 'block';
      }
    });

    // メニュー外をクリックしたら非表示にする
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        content.style.display = 'none';
      }
    });
  });
  });
  // スライドショー設定
  const images = [
    'image/image1.jfif',
    'image/image2.jpg',
    'image/image3.jpg',
    'image/image4.jpg',
    'image/image5.jpg',
    'image/image6.jpg',
    'image/image7.jpg',
  ];
  const links = [
    'https://example.com/page1', // image1.jpgのリンク先
    'https://example.com/page2', // image2.jpgのリンク先
    'https://example.com/page3', // image3.jpgのリンク先
    'https://example.com/page4', // image4.jpgのリンク先
    'https://example.com/page5', // image5.jpgのリンク先
    'https://example.com/page6', // image6.jpgのリンク先
    'https://example.com/page7', // image7.jpgのリンク先
  ];

  let currentIndex = 0;
  const slideImage = document.getElementById('slide-image');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  let autoSlideInterval;

  // スライド更新関数
  function updateSlide(index) {
    slideImage.src = images[index];
    slideImage.dataset.link = links[index]; // 画像にリンク先をデータ属性として設定
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  // 自動スライド切り替え関数
  function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide(currentIndex);
    }, 3000); // 3000ミリ秒（3秒）ごとにスライドを切り替え
  }

  // 自動スライドを停止する関数
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // 手動操作時に自動スライドを再開
  prevBtn.addEventListener('click', function () {
    stopAutoSlide();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(currentIndex);
    startAutoSlide();
  });

  nextBtn.addEventListener('click', function () {
    stopAutoSlide();
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide(currentIndex);
    startAutoSlide();
  });

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', function () {
      stopAutoSlide();
      currentIndex = i;
      updateSlide(currentIndex);
      startAutoSlide();
    });
  });

  // スライド画像をクリックしたときにリンク先に移動
  slideImage.addEventListener('click', function () {
    const link = slideImage.dataset.link; // データ属性からリンク先URLを取得
    window.location.href = link;
  });

  // 初期表示
  updateSlide(currentIndex);
  startAutoSlide(); // ページロード時に自動スライド開始
});

// 切り替え前にズームインクラスを追加
function updateSlide(index) {
  slideImage.classList.remove('fade-in', 'slide-in', 'zoom-in');
  slideImage.src = images[index];
  slideImage.dataset.link = links[index];
  slideImage.classList.add('zoom-in');
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
}

//フォームのデータの管理
document.getElementById('attendanceForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // フォームデータを取得
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });

  // JSONファイル形式に変換
  const fileName = `attendance_${Date.now()}.json`;
  const fileContent = JSON.stringify(data, null, 2);

  // GitHub APIに送信する情報
  const repoOwner = 'your-github-username'; // GitHubユーザー名
  const repoName = 'attendance-data'; // 保存先のリポジトリ名
  const branch = 'main'; // 保存先ブランチ
  const token = 'your-personal-access-token'; // 取得したPATを挿入

  // GitHub APIを使ってファイルを作成
  try {
      const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              message: `Add new attendance record: ${fileName}`,
              content: btoa(fileContent), // Base64エンコード
              branch: branch
          })
      });

      if (response.ok) {
          alert('データがGitHubに保存されました！');
          event.target.reset();
      } else {
          const errorData = await response.json();
          console.error('GitHub APIエラー:', errorData);
          alert('保存に失敗しました。');
      }
  } catch (error) {
      console.error('エラー:', error);
      alert('エラーが発生しました。');
  }
});







// header.htmlの内容をテンプレート文字列として定義
const headerHTML = `
<header>
  <div class="header-container">
    <div><img src="./image/top_logo-on.png" alt="和歌山工業高校ロゴ" class="header-logo" />
    </div>
    <nav>
      <ul>
        <li class="dropdown">
          <a href="#about">学校紹介</a>
          <div class="dropdown-content">
            <a href="#">学校長挨拶</a>
            <a href="#">歴史・沿革</a>
            <a href="#">校歌</a>
            <a href="#">教育方針</a>
            <a href="#">教育課程</a>
            <a href="#">学校行事</a>
            <a href="#">部活動</a>
            <a href="#">進路情報</a>            
            <a href="#">学校評価</a>
            <a href="#">学校運営協議会</a>
            <a href="#">タバコの正体</a>
            <a href="#">アクセス</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#students">在校生・保護者の方</a>
          <div class="dropdown-content">
            <a href="#">在校生の皆さんへ</a>
            <a href="#">欠席・遅刻の連絡</a>
            <a href="#">奨学金のお知らせ</a>
            <a href="#">気象警報発令時</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#graduates">卒業生の方</a>
          <div class="dropdown-content">
            <a href="#">証明書等の発行手続き</a>
            <a href="#">同窓会からのお知らせ</a>
          </div>
        </li>
        <li><a href="#admissions">入学・転学希望の方</a></li>
        <li class="dropdown">
          <a href="#graduates">その他</a>
          <div class="dropdown-content">
            <a href="#">教育実習生の方</a>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</header>
`;

// DOMが読み込まれた後にヘッダーを挿入
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('header-placeholder').innerHTML = headerHTML;
});
