
const WAIT_TIME = 2;

class ImageDisplay {
    constructor(imagePath1, imagePath2) {
        this.imagePaths = [imagePath1, imagePath2];
        this.currentIndex = 0;
    }

    async displayImages() {
        while (this.currentIndex < this.imagePaths.length) {
            try {
                const img = await this.createImage(this.imagePaths[this.currentIndex]);
                this.showImage(img);
                await this.wait(WAIT_TIME);
                this.hideImage(img);
                this.currentIndex++;
            } catch (error) {
                console.error(error);
            }
        }
    }

    createImage(imagePath) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = imagePath;

            img.onload = () => {
                img.className = 'images';
                resolve(img);
            };

            img.onerror = (error) => {
                reject(`画像の読み込みに失敗しました: ${error}`);
            };
        });
    }

    wait(seconds) {
        return new Promise(resolve => {
            setTimeout(resolve, seconds * 1000);
        });
    }

    showImage(img) {
        img.style.display = 'block';
        document.querySelector('.relative').appendChild(img);
    }

    hideImage(img) {
        img.style.display = 'none';
    }
}

const imagePath1 = "first-image.jpeg";
const imagePath2 = "second-image.jpeg";
const imageDisplay = new ImageDisplay(imagePath1, imagePath2);

imageDisplay.displayImages();

