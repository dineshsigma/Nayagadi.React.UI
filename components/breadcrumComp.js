import { Breadcrumb, BreadcrumbItem, Container, Row } from "reactstrap";
import { useRouter } from 'next/router';
import Link from "next/link";

function BreadcrumComp({ active_page }) {

    return (
        <Row className="bg-ash">
            <div >
                <ol class="breadcrumb mt-3">
                    <li class="breadcrumb-item mb-0 black"><Link className="bred-anchor" href="/">Home</Link></li>
                    <li class="breadcrumb-item mb-0 black active" aria-current="page">  {active_page}</li>
                </ol>
            </div>
            {/* <Breadcrumb listTag="div" className="mt-3">
                <BreadcrumbItem
                    tag="p"
                    className="mb-0 black"
                >
                    Home
                </BreadcrumbItem>

                <BreadcrumbItem
                    active
                    tag="p"
                    className="mb-0"
                >
                    {active_page}
                </BreadcrumbItem>
            </Breadcrumb> */}
        </Row>
    )
}

export default BreadcrumComp;