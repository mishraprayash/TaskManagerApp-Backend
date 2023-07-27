
document.addEventListener('DOMContentLoaded', function () {

    const taskform = document.getElementById('inputs')
    const taskName = document.getElementById('taskName')
    taskform.addEventListener('submit', async (event) => {
        event.preventDefault();
        const task = taskName.value.trim()
        try {
            const response = await fetch('/api/v1/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            })
            const data = await response.json()
            console.log(data) 
        }
        catch(error){
            console.log('Error: ',error)
        }
    })
})