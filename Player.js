class Player{
  constructor(obj){
    this.name = obj.name;
    this.positions = [];
    this.dir = [1, 0];
    this.alive = true;
    this.winner = false;

    this.score = 0;

    this.goUp = () => this.dir = [0, -1];
    this.goDown = () => this.dir = [0, 1];
    this.goLeft = () => this.dir = [-1, 0];
    this.goRight = () => this.dir = [1, 0];
  }

  addLength(amount){
    for(let i = 0; i < amount; i++) this.positions.push(this.positions[this.positions.length - 1]);
  }

  updatePosition(pos){
    if(this.alive) this.positions =  [pos].concat(this.positions.slice(0, this.positions.length - 1));
  }

  hasPos(test, withoutHead){
    let done = false;
    let positions = this.positions;
    if(withoutHead) positions = this.positions.slice(1, this.positions.length);
    positions.forEach(pos => {
      if(pos[0] == test[0] && pos[1] == test[1]) done = true;
    });
    // console.log(done);
    return done;
  }

  go(){
    const pos = this.positions[0];
    this.updatePosition([pos[0] + this.dir[0], pos[1] + this.dir[1]]);
  }

  getHead(){
    return this.positions[0];
  }

  die(){
    this.alive = false;
    this.winner = false;
  }

  addScore(amnt){
    this.score += amnt;
  }
}
