import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const Slide = ({ slidesToSlide, arrowsScroll, children }) => {
  // Convert children to array for AliceCarousel
  const items = React.Children.toArray(children)

  return (
    <div className="slide flex justify-center pt-24 pb-24">
      <div className="container max-w-7xl">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            1024: { items: 4 }
          }}
          controlsStrategy="alternate"
          slidesToSlide={slidesToSlide}
          arrowsScroll={arrowsScroll}
          infinite={true}
          disableDotsControls={true}
        />
      </div>
    </div>
  )
}

export default Slide