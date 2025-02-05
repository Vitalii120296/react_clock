import React from 'react';

type Props = {
  clockName: string;
};

type State = {
  today: Date;
};

export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date(),
  };

  timerId = 0;

  updateClock = () => {
    this.setState({ today: new Date() }, () =>
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4)),
    );
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(this.updateClock, 1000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.timerId);
  }

  render(): React.ReactNode {
    const { clockName } = this.props;
    const { today } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}
        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
