let flagPosition = [];
let observer = null;

function emitChange() {
  observer(flagPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveflag(toX, toY) {
  flagPosition = [toX, toY];
  emitChange();
}
