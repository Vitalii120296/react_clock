import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type Props = {};

type State = {
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<Props, State> {
  state: State = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  timerId: number = 0;

  rightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  leftClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: true });
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(() => {
      this.setState((prevState: State) => {
        const newName = getRandomName();

        // eslint-disable-next-line no-console
        console.warn(`Renamed from ${prevState.clockName} to ${newName}`);

        return { clockName: newName };
      });
    }, 3300);

    document.addEventListener('click', this.leftClick);
    document.addEventListener('contextmenu', this.rightClick);
  }

  componentDidUpdate(prevState: { hasClock: boolean }) {
    if (prevState.hasClock && !this.state.hasClock) {
      window.clearInterval(this.timerId);
    }
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
    document.removeEventListener('click', this.leftClick);
    document.removeEventListener('contextmenu', this.rightClick);
  }

  render() {
    const { hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock clockName={clockName} />}
      </div>
    );
  }
}
