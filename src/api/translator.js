export default function getTranslations(word) {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([`${word} - translation1`, `${word} - translation2`, `${word} - translation3`, `${word} - translation4`, `${word} - translation5`]);
            }, 1000);
        });
}