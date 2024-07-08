
const RegisterForm = ({handleSubmit,name,setName, email,setEmail,password,setPassword}) => (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" >email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button  disabled={ !name || !email || !password} type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
  
  export default RegisterForm;