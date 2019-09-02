export default class Artist {
  static get Math() {
    return {
      rand(min: number, max: number) {
        const rand = Math.random()
        return Math.floor(rand * (max - min) + min)
      },
    }
  }
}
