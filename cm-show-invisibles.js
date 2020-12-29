CodeMirror.defineOption('showInvisibles', false, (cm, val, prev) => {
  let Count = 0;
  const Maximum = cm.getOption('maxInvisibles') || 16;
  if (prev === CodeMirror.Init)
    prev = false;
  if (prev && !val) {
    cm.removeOverlay('invisibles');
    return;
  }
  if (!prev && val) {
    //add(Maximum);
    cm.addOverlay({
      name: 'invisibles',
      token: function nextToken(stream) {
        let spaces = 0;
        let peek = stream.peek() === ' ';
        if (peek) {
          while (peek && spaces < Maximum) {
            ++spaces;
            stream.next();
            peek = stream.peek() === ' ';
          }
          let ret = 'whitespace whitespace-' + spaces;
          /*
           * styles should be different
           * could not be two same styles
           * beside because of this check in runmode
           * function in `codemirror.js`:
           *
           * 6624: if (!flattenSpans || curStyle != style) {}
           */
          if (spaces === Maximum)
            ret += ' whitespace-rand-' + Count++;
          return ret;
        }
        while (!stream.eol() && !peek) {
          stream.next();
          peek = stream.peek() === ' ';
        }
        return 'cm-eol';
      },
    });
  }
});