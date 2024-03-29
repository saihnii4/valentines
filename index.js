const IMG_COUNT = 71;

const loaded = Array(72).fill(false);

const preload = (id) =>
  new Promise((res, req) => {
    if (loaded[id]) return req();
    const im = new Image();
    im.src = `/valentines/stop_motion/${id}.webp`;
    im.onload = res;
    im.onerror = req;
  });

window.onload = () => {
  const target = document.querySelector("#focal");

  const docE = document.documentElement;
  Promise.all([...Array(72).keys()].map(preload))
    .then(() => {
      document.body.classList.remove("locked");
    })
    .catch(() => {
      document.body.classList.remove("locked");
    });

  window.onscroll = (ev) => {
    const id = Math.floor(
      IMG_COUNT * (docE.scrollTop / (docE.scrollHeight - docE.clientHeight))
    );

    if (id < 0) return; // possible if overscrolling

    target.src = `/valentines/stop_motion/${id}.webp`;
  };
};
