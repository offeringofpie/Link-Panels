export function iframe(element) {
  let correct_url = '';
  element.querySelectorAll('iframe').forEach(e => {
    if (e.src.length && !e.src.match(/google.com|twitter.com|addthis.com/)) {
      correct_url = e.src;
    }
  });

  return correct_url;
}
