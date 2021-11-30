interface Props {
  left: JSX.Element,
  right: JSX.Element 
}

const SplitView = ({left, right}: Props) => {

  return (
    <div className={'container'}>
      {left}
      {right}
    </div>
  );
};

export default SplitView;
