class MyText {
  static ellipsis(text: string, length: number) {
    return text.length > length ? text.slice(0, length) + '...' : text
  }
}

export default MyText
