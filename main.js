let audio= document.querySelector('.quranPlayer');
let surahsContainer=document.querySelector('.surahs');
let aya=document.querySelector('.aya');
let translation=document.querySelector('.translation');
let next=document.querySelector('.next');
let prev=document.querySelector('.prev');
let play=document.querySelector('.play');
 function getSurahs(){
fetch('https://quran-endpoint.vercel.app/quran')
.then(res=>res.json())
.then(
    data=>{
        console.log(data)

        for(let surah in data.data){
            surahsContainer.innerHTML +=
            `<div>
            <p>${data.data[surah].asma.ar.long}</p>
            <p>${data.data[surah].asma.en.long}</p>
            </div>
            `

           
        }

        let allSurahs=document.querySelectorAll('.surahs div');
        console.log(allSurahs);
        ayatsAudios=[] ;
        ayatsTexts=[];


    allSurahs.forEach((surah,index)=>{
        surah.addEventListener('click',()=>{
            fetch(`https://quran-endpoint.vercel.app/quran/${index+1}`)
            .then(res=>res.json())
            .then((data)=>{
    
               /* console.log(data) */
                let ayahs=data.data.ayahs
                let ayatsAudios=[] ;
                let ayatsTexts=[];
                let ayatsTranslation=[]
                console.log(ayahs)



                ayahs.forEach(aya=>{
                   
                    console.log(aya.text.ar)
                    console.log(aya.translation.en)
                    console.log(aya.audio.url)

                    ayatsAudios.push(aya.audio.url)
                    ayatsTexts.push(aya.text.ar)
                    ayatsTranslation.push(aya.translation.en)

                    console.log(ayatsTexts)
                    console.log(ayatsTranslation)
                    console.log( ayatsAudios)

                })

                let ayahIndex=0;
                changeAya(ayahIndex)
                audio.addEventListener('ended',()=>{
                    ayahIndex++ 
                    if(ayahIndex < ayatsAudios.length ){changeAya(ayahIndex)}
                    else{
                        ayahIndex=0;changeAya(ayahIndex);audio.pause();
                       /* Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "surah has been ended",
                            showConfirmButton: false,
                            timer: 1500
                          }
                         
                          ); */
                          isPlaying=true;
                          togglePlay()
                        
                    }
                    


                })

               //handle prev and next

               next.addEventListener('click',()=>{
                if(ayahIndex < ayatsAudios.length-1 ){ayahIndex++ ;changeAya(ayahIndex)}
                else{ayahIndex==0; }
                    
               })

               prev.addEventListener('click',()=>{
                
                if(ayahIndex < ayatsAudios.length && ayahIndex>0 ){ayahIndex-- ;changeAya(ayahIndex)}
                else{ayahIndex=0 }


                    
               })



                function changeAya (index){
                    audio.src= ayatsAudios[index];
                aya.innerHTML=  ayatsTexts[index];
                translation.innerHTML=ayatsTranslation[index];
                audio.play()
                
                


                }


                //handle play and pause
               

                let isPlaying=false;
                togglePlay()
                function togglePlay(){
                    if(isPlaying==true){
                        audio.pause();
                        play.innerHTML=`<i class="fas fa-play"></i>  `
                        isPlaying=false;

                    }
                    else{audio.play();
                        play.innerHTML=`<i class="fas fa-pause"></i>  `
                        isPlaying=true

                    }
                }

                play.addEventListener("click",togglePlay)
                


                









                




                })

            })

        }

           
        )
       /* console.log(surah)
        console.log(index) */
       
    })



    }
    




 getSurahs()
