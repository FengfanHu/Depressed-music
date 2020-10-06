import React, { useEffect, createRef } from 'react';

function Cover(props) {
    const { src, alt } = props;
    const ref = createRef();

    useEffect(()=> {
        // 图片懒加载
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    const img = entry.target;
                    img.src = img.getAttribute('source');
                    observer.unobserve(img);
                }
            })
        })
        observer.observe(ref.current)
    }, [ref])

    return (
        <img ref={ref} alt={alt} source={src} />
    )
}

export default Cover;