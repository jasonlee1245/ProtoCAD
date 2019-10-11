import * as React from 'react';
import Tree from 'react-d3-tree';
import { connect } from 'react-redux';
import { setCurrentComponent, setSelectedComponent } from '../actions/componentsAction';
import MyModal from './Modal.jsx';

class MyTree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickPosition: {
        x: 0,
        y: 0
      },
      open: false,
      translate: {
        x: 0,
        y: 0
      }
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onMouseClick = e => this.setState({
    clickPosition: {
      x: e.clientX,
      y: e.clientY
    }
  });

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState(prevState => ({
      ...prevState,
      translate: {
        x: dimensions.width / 2,
        y: 50
      }
    }));

    document.querySelector('#tree').addEventListener('click', this.onMouseClick);
  }

  onClick = node => {
    this.handleOpen();
    const selected = this.props.components.filter(item => item.name === node.name);
    if (selected.length > 0) this.props.setSelectedComponent(selected[0]);
  };

  render() {
    return <div id={'tree'} style={{width: '100%', height: '100%'}} ref={tc => (this.treeContainer = tc)}>
      <Tree className={'myTree'} styles={{width: '100%', height: '100%'}} translate={this.state.translate} data={this.props.current} collapsible={false} onClick={this.onClick} orientation={'vertical'} />
      <MyModal handleClose={this.handleClose} open={this.state.open} x={this.state.clickPosition.x} y={this.state.clickPosition.y} />
    </div>;
  }

}

const mapStateToProps = state => ({
  components: state.components.data,
  current: state.current.data
});

const mapDispatchToProps = dispatch => ({
  setSelectedComponent: data => dispatch(setSelectedComponent(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTree);