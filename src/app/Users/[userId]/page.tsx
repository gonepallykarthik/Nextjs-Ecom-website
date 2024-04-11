interface props {
  params: {
    userId: string;
  };
}

const getUser = ({ params }: props) => {
  console.log(params);
  return (
    <div>
      <h1> User is {params.userId} </h1>
    </div>
  );
};

export default getUser;
