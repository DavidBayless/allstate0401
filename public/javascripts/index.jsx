var ThoughtBoard = React.createClass({
  getInitialState: function() {
    return ({
      text: '',
      posts: []
    })
  },

  componentDidMount: function() {
    var self = this;
    $.get('http://localhost:3000/tweetz', function(data) {
      console.log(data);
      var remodel = data.map(function(post, idx) {
        return (
          <Post text={post.text} key={idx}/>
        )
      })
      self.setState({
        posts: remodel
      })
    })
  },
  render: function(){
    return(
      <div>
        <h1>Thought Board</h1>
        <textarea onChange={this.setText}></textarea>
        <button value="Thought Board It!" onClick={this.addThought}>Thought Board It!</button>
        <ul>{this.state.posts}</ul>
      </div>
    )
  },
  addThought: function(e) {
    var self = this;
    var text = document.querySelector('textarea').value
    $.post('http://localhost:3000/tweetz/new', {'text': text}, function(data) {
      console.log(data);
      self.state.posts.push(<Post text={text} key={self.state.posts.length + 1}/>)
      document.querySelector('textarea').value = '';
      self.forceUpdate();
    })
  }
})

var Post = React.createClass({
  render: function (){
    return(
      <div id='post'>{this.props.text}</div>
    )
  }
})


ReactDOM.render(<ThoughtBoard/>, document.getElementById('entry'))
