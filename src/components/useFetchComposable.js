import { ref } from "vue";
export function useFetch(url) {
    const data = ref(null )
    const error = ref(null )
   const loading = ref(false)
    
    fetch(url)
    .then((response) => response.json())
        .then((product) => {
            data.value = product.products
            loading.value = false
            
        }).catch((err) => {
            loading.value = false
           error.value = err
            console.log(err);
        });
        
        return {data, error,loading}
}