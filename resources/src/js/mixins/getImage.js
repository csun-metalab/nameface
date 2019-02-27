export const getImage = {
    computed: {
        image() {
            let secret= document.querySelector('meta[name=secret]').content + '&source=true';
            let imageRoute = document.querySelector('meta[name=img-url]').content + `${this.student.email_uri}` + '/' + `${this.student.image_priority}` +'?secret='+ secret;
            return imageRoute;
        },
    }
}
