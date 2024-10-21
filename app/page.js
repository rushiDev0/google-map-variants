import GoogleMapReact from "@/components/googleMapReact";

export default function Home() {
  return (
    <>
      <section>
        <h1>map</h1>

          <div className="w-full">


              {/*<LeafletMap/>*/}
          </div>
      </section>
        <section>
            <div className="">
                <GoogleMapReact/>
            </div>
        </section>

        <section>
            <div className="">
                <p className="first-letter:text-3xl text-sm first-letter:[-webkit-initial-letter:3] first-letter:[initial-letter:3]">Quality<br/>
                Committed to maintaining the highest standards of product quality, ensuring consistency, purity, and safety in every step of production.</p>
            </div>
        </section>
    </>
  );
}
