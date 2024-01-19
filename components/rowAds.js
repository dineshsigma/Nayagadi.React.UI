function RowAd({Imgsrc, bgColorClass=''}) {
  return (
    <div className={`container-lg container-sm-fluid` + bgColorClass ? bgColorClass : '' } >          
      {/* <img className="px-lg-5 img-fluid"  src={Imgsrc} />  */}
      <img className="img-fluid"  src={Imgsrc} /> 
    </div>
  )
}

export default RowAd;