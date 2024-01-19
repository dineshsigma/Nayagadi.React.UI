import {React360Viewer} from 'react-360-product-viewer'

function Product360View(){
    return(
        <React360Viewer className='product-view-img'
            // width={"100%"}
            // height = {"100%"}
            imagesBaseUrl="/images"
            imagesCount={63}
            imagesFiletype="jpg"
            mouseDragSpeed={20}
            // imageInitialIndex ={0}
            // shouldNotifyEvents={false}
            autoplay
            // spinReverse = {true}
        />
    )
}

export default Product360View;