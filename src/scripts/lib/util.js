const load_view = document.getElementById('load-view')
const progress_bar = document.querySelector('.load-progressbar-mainline')
const eriri_animation = document.getElementById('eriri-animation')
const title_animation = document.getElementById('title-animation')
const top_page = document.getElementById('top-page')
const pages = document.querySelector('#pages')

/**
 * 画像のプリロード
 * @param images   : 画像パスの配列
 * @param fn       : コールバック関数
 * @param progress : 読み込み状況取得用コールバック関数
 */
export const preload = (images, fn, progress) => {
  const len  = images.length
  let load = 0

  images.forEach((image, key) => {
    const img = new Image()
    img.src = image
    img.onload = () => {
      load += 1
      progress({
        size : len,
        load : load,
        per  : load / len
      })

      if(load >= len) fn()
    }
  })
}

/**
 * スマートフォンかどうかの真偽
 * @return bool
 */
export const isSP = () => {
  const useragent = navigator.userAgent.toLowerCase()
  const reg = /(iphone|ipad|ipod|android|mobile)/

  return reg.test(useragent)
}

/**
 * PCかどうかの真偽
 * return bool
 */
export const isPC = () => {
  return !isSP()
}

/**
 * 指定した時間に要素を非表示にする
 * @param selector : セレクタ名
 * @param time     : 時間
 */
export const hiddenTimeout = (selector, time) => {
  setTimeout(() => {
    document.querySelector(selector).style.display = 'none'
  }, time)
}

/**
 * プログレスバーの更新
 * @param per : 割合
 */
export const updateProgressBar = per => {
  per *= 100
  progress_bar.children[0].style.transform = `translateX(${ -(100 - per) }%)`  
}

/**
 * ロードの終了
 */
export const finLoadView = () => {
  setTimeout(() => {
    load_view.setAttribute('data-state', 'fin')
    startEririAnimation()
  }, 800)
}

/**
 * eriri-animationの開始
 */
export const startEririAnimation = () => {
  setTimeout(() => {
    load_view.style.display = 'none'
    eriri_animation.setAttribute('data-state', 'start')
    startTitleAnimation()
  }, 9400)
}

/**
 * title-animationの開始
 */
export const startTitleAnimation = () => {
  setTimeout(() => {
    eriri_animation.style.display = 'none'
    title_animation.setAttribute('data-state', 'start')
    startTopPage()
  }, 9500)
}

/**
 * top-pageの開始
 */
export const startTopPage = () => {
  setTimeout(() => {
    title_animation.style.display = 'none'
    top_page.setAttribute('data-state', 'start')
  }, 7000)
}

/**
 * main-illustのサイズを設定
 */
export const setMainIllustSize = () => {
  let height = 0
  if(isPC()) height = window.innerHeight >= 650 ? window.innerHeight : 650
  else       height = document.getElementById('top-page').clientHeight
  const illusts = document.querySelectorAll('.main-illust .illust .image')
  
  illusts.forEach(node => {
    node.style.height = `${ height }px`
  })
}

/**
 * global-navのエフェクト設定
 */
export const setNavEffect = () => {
  const nav_li = document.querySelectorAll('.nav-li')
  const nav_effect = document.querySelectorAll('.nav-effect section')
  nav_li.forEach((node, i) => {
    node.number = i
    
    node.addEventListener('mouseover', e => {
      nav_effect[node.number].setAttribute('data-hover', 'true')
    })

    node.addEventListener('mouseout', e => {
      nav_effect[node.number].setAttribute('data-hover', 'false')
    })
  })
}

/**
 * sp-menuのクリック処理
 */
export const bindSpMenu = () => {
  const sp_menu = document.querySelector('.sp-menu')
  const global_nav = document.querySelector('.global-nav')

  sp_menu.addEventListener('click', e => {
    const state = sp_menu.getAttribute('data-state')
    if(state === 'true') {
      sp_menu.setAttribute('data-state', '')
      global_nav.setAttribute('data-state', '')
    } else {
      sp_menu.setAttribute('data-state', 'true')
      global_nav.setAttribute('data-state', 'true')
    }
  }, false)
}

/**
 * global-navのルーティングをバインド
 */
export const bindRouting = () => {
  const global_nav = document.querySelectorAll('.global-nav .nav-li')

  global_nav.forEach(nav_li => {
    nav_li.addEventListener('click', e => {
      e.preventDefault()
      const route = nav_li.href.match(/#(.+?)$/)[1]
      showPage(route)
    }, false)
  })
}

/**
 * 閉じるボタンのバインド
 */
export const bindCloseBtn = () => {
  const close_btn = document.querySelector('.close-btn')
  close_btn.addEventListener('click', e => {
    hiddenPage()
  }, false)
}

/**
 * ページの表示
 * @param route : パス名
 */
export const showPage = route => {
  pages.style.display = 'block'
  pages.setAttribute('data-state', 'true')
  showTargetPage(route)
}

/**
 * ページの非表示
 */
export const hiddenPage = () => {
  pages.setAttribute('data-state', 'false')
  hiddenAllPage()
  setTimeout(() => {
    pages.style.display = 'none'
  }, 500)
}

/**
 * ターゲットのページを表示
 * @param route : パス名
 */
export const showTargetPage = route => {
  const target_page = document.querySelector(`.${ route }-page`)
  target_page.style.display = 'block'
}

/**
 * 各ページを非表示
 */
export const hiddenAllPage = () => {
  const profile_page = document.querySelector('.profile-page')
  const history_page = document.querySelector('.history-page')
  const product_page = document.querySelector('.product-page')
  const memories_page = document.querySelector('.memories-page')
  const sponsor_page = document.querySelector('.sponsor-page')

  profile_page.style.display = 'none'
  history_page.style.display = 'none'
  product_page.style.display = 'none'
  memories_page.style.display = 'none'
}
